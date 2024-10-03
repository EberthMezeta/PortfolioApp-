class AddHashIdToResumes < ActiveRecord::Migration[7.2]
  def change
    add_column :resumes, :hash_id, :string
  end
end
