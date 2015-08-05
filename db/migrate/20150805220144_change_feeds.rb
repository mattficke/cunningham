class ChangeFeeds < ActiveRecord::Migration
  def change
    remove_column :feeds, :location
    add_column :feeds, :latitude, :decimal
    add_column :feeds, :longitude, :decimal
    add_column :feeds, :radius, :integer
  end
end
