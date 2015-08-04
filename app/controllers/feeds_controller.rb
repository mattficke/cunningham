class FeedsController < ApplicationController
  skip_before_action :authenticate
  def index

  end

  def show
    place_id = params[:id]
    @media = Instagram.location_recent_media(place_id)
  end

  def new
    url = URI.parse(request.original_url)
    query = CGI.parse(url.query)
    lat = query['lat'].first
    lng = query['lng'].first
    @places = Instagram.location_search(lat, lng)
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
