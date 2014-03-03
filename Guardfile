guard "jekyll-plus", :serve => true do
  watch /.*/
  ignore /^_site/
end

guard :sass, 
	:input => 'assets/scss', 
	:output => 'assets/css', 
	:all_on_start => true, 
	:smart_partials => true, 
	:style => :compressed

guard :jammit, 
	:config_path => 'assets/_assets.yml',
	:output_folder => 'assets/js' do 
		watch(%r{(?:js)(/.+)\.(?:js)}) { |m| m[0] unless m[1] =~ /\/\./ } 
	end