class Image < ApplicationRecord
  acts_as_taggable
  validates :url, presence: true, format: URI::regexp(%w[http https])
  validates :tag_list, length: { minimum: 1 }
end
