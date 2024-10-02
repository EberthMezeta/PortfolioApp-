class ContactLink < ApplicationRecord
  belongs_to :resume

  validates :platform, presence: true
  validates :url, presence: true, format: { with: URI.regexp(%w[http https]) }
end
