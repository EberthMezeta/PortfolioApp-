class RenameTypeColumnInSkills < ActiveRecord::Migration[7.2]
  def change
        rename_column :skills, :type, :skill_type # Cambia `skill_type` por el nombre que prefieras
  end
end
