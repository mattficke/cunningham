class FeedsController < ApplicationController
  skip_before_action :authenticate, only: [:index, :show, :new]
  def index
    url = URI.parse(request.original_url)
    query = CGI.parse(url.query)
    @lat = query['lat'].first.to_f.round(3)
    @lng = query['lng'].first.to_f.round(3)
    @radius = query['radius'].first
    @media = Instagram.media_search(@lat, @lng, :distance => @radius)
  end

  def index_user
    @user = User.find(params[:id])
    @feeds = @user.feeds.paginate(:page => params[:page], :per_page => 5)
    render 'users/index'
  end

  def show
    @feed = Feed.find(params[:id])
    @media = Instagram.media_search(@feed.latitude, @feed.longitude, :distance => @feed.radius)
  end

  def new
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
  def feed_params
    params.permit(:latitude, :longitude, :radius, :name)
  end

end
