class CreateContactLinks < ActiveRecord::Migration[7.2]
  def change
    create_table :contact_links do |t|
      t.string :platform
      t.string :url
      t.references :resume, null: false, foreign_key: true

      t.timestamps
    end
  end
end
