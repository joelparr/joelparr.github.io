# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard "jekyll-plus", :serve => true do
  watch /.*/
  ignore /^_site/
end

guard 'sass', :input => 'assets/scss', :output => 'assets/css', :all_on_start => true, :smart_partials => true
#:style => :compressed