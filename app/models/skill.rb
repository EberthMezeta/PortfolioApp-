class Skill < ApplicationRecord
  belongs_to :resume

  validates :name, presence: true
  validates :skill_type, inclusion: { in: [ 0, 1 ], message: "must be 0 (Skill) or 1 (Soft Skill)" } # 0 para habilidades técnicas, 1 para blandas
end
