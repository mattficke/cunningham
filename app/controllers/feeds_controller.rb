class FeedsController < ApplicationController
  skip_before_action :authenticate
  def index
    url = URI.parse(request.original_url)
    query = CGI.parse(url.query)
    lat = query['lat'].first
    lng = query['lng'].first
    @places = Instagram.location_search(lat, lng)
  end

  def show
    # @location_id = params[:id]
    @location = Instagram.location(params[:id])
    @feed = Instagram.location_recent_media(@location.id)
  end

  def new

  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end


end
