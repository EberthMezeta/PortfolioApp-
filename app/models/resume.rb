class Resume < ApplicationRecord
  belongs_to :user

  has_many :skills, dependent: :destroy
  has_many :contact_links, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :experiences, dependent: :destroy

  validates :nombre, presence: true, length: { maximum: 100 }, uniqueness: { scope: :user_id, message: "Ya existe un currículum con este nombre para el usuario." }
  validates :hash_id, uniqueness: true, allow_nil: true

  def generate_hash_id
    update(hash_id: SecureRandom.hex(10)) if hash_id.nil?
  end
end
