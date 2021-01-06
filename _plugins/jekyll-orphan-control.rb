require "jekyll"
  
  
  module Jekyll
    class OrphanControl
      require_relative "jekyll-orphan-control.rb"
      BODY_START_TAG = "<body"
      OPENING_BODY_TAG_REGEX = %r!<body(.*?)>\s*!m.freeze
  
      class << self
        def orpahn(doc)
          OrphanArray::TERMS_ARRAY.default_proc = ->(h,k) { k }
          return unless doc.output&.scan(/<[p][^>]*>(.+?)<\/[p]>/).flatten.each {
                          
           |item| item.gsub(/\w+/, OrphanArray::TERMS_ARRAY).to_s
          
            } 
          
          
          #return unless doc.output.scan(/<[p][^>]*>(.+?)<\/[p]>/).flatten.gsub(/w/, OrphanArray::TERMS_ARRAY).to_s

        end
  
        # Public: Filters hash where the key is the asset root source.
        # Effectively a cache.
        def filters
          @filters ||= {}
        end
  
        # Public: Calculate the asset root source for the given config.
        # The custom emoji asset root can be defined in the config as
        # emoji.src, and must be a valid URL (i.e. it must include a
        # protocol and valid domain)
        #
        # config - the hash-like configuration of the document's site
        #
        def orpahnable?(doc)
          (doc.is_a?(Jekyll::Page) || doc.write?) &&
            doc.output_ext == ".html" || doc.permalink&.end_with?("/")
        end
      end
    end
  end
  
  Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
    Jekyll::OrphanControl.orpahn(doc) if Jekyll::OrphanControl.orpahnable?(doc)
  end