class ChangeFeeds < ActiveRecord::Migration
  def change
    remove_column :feeds, :location
    add_column :feeds, :latitude, :numeric
    add_column :feeds, :longitude, :numeric
    add_column :feeds, :radius, :integer
  end
end
