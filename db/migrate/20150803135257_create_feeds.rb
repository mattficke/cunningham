class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.integer :location
      t.string :name
      t.references :user, index: true, foreign_key: true
    end
  end
end
