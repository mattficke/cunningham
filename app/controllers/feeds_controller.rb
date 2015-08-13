class FeedsController < ApplicationController
  before_action :authorize
  skip_before_action :authenticate, only: [:index, :show, :new]
  skip_before_action :authorize, except: [:edit, :update, :destroy]

  def index
    @user = User.find(params[:id])
    @feeds = @user.feeds.paginate(:page => params[:page], :per_page => 5)
    @media = @feeds.map do |feed|
      Instagram.media_search(feed.latitude, feed.longitude, :distance => feed.radius)
    end
  end

  def show
    @feed = Feed.find(params[:id])
    @oembed = Array.new
    @media = Instagram.media_search(@feed.latitude, @feed.longitude, :distance => @feed.radius)
  end

  def new
    @feed = Feed.new
    query = get_query_strings
    @lat = query['lat'].first.to_f.round(3)
    @lng = query['lng'].first.to_f.round(3)
    @radius = query['radius'].first
    @media = Instagram.media_search(@lat, @lng, :distance => @radius)
  end

  def create
    @user = User.find(session[:user]["id"])
    @feed = Feed.create(feed_params.merge(user_id: @user.id))
    redirect_to "/user/#{@user.id}/feeds"
  end

  def edit
    @feed = Feed.find(params[:id])
  end

  def update
    @feed = Feed.find(params[:id])
    @feed.update(feed_params)
    redirect_to "/user/#{@feed.user_id}/feeds"
  end

  def destroy
    @user = User.find(session[:user]["id"])
    @feed = Feed.find(params[:unsubscribe_id])
    @feed.destroy
    redirect_to "/user/#{@user.id}/feeds"
  end

  private
  def authorize
    @feed = Feed.find(params[:id])
    if session[:user]["id"] != @feed.user_id
      redirect_to '/sign_in'
    end
  end

  private
  def feed_params
    params.require(:feed).permit(:latitude, :longitude, :radius, :name)
  end

end
