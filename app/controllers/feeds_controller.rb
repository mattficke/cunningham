class FeedsController < ApplicationController
  skip_before_action :authenticate
  def index
    url = URI.parse(request.original_url)
    query = CGI.parse(url.query)
    lat = query['lat'].first
    lng = query['lng'].first
    @places = Instagram.location_search(lat, lng)
  end

  def index_user
    @user = User.find(params[:id])
    @feeds = @user.feeds
    render 'users/index'
  end

  def show
    @location = Instagram.location(params[:id])
    @feed = Instagram.location_recent_media(@location.id)
  end

  def new
  end

  def create
    @user = User.find(session[:user]["id"])
    @feed = Feed.create(feed_params.merge(user_id: @user.id))
    redirect_to "/user/#{@user.id}/feeds"
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def feed_params
    params.permit(:location, :name)
  end


end
