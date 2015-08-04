class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.text :feed
      t.string :feed_name
      t.references :user, index: true, foreign_key: true
    end
  end
end
