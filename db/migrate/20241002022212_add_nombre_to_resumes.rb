class AddNombreToResumes < ActiveRecord::Migration[7.2]
  def change
    add_column :resumes, :nombre, :string
  end
end
