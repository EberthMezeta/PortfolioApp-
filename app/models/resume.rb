class Resume < ApplicationRecord
  belongs_to :user

  has_many :skills, dependent: :destroy
  has_many :contact_links, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :experiences, dependent: :destroy
end
