const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://szktygmanoyniopzlxwf.supabase.co',
  'sb_publishable_XytGOR6vMzx-pgpPbHd7Ig_lsyatRst'
);

async function migrate() {
  try {
    const menuItems = JSON.parse(fs.readFileSync('old_menu_items_utf8.json', 'utf8'));
    const siteSettings = JSON.parse(fs.readFileSync('old_site_settings_utf8.json', 'utf8'));

    console.log(`Migrating ${menuItems.length} menu items...`);
    const { error: menuError } = await supabase.from('menu_items').insert(menuItems);
    if (menuError) throw menuError;

    console.log(`Migrating site settings...`);
    // siteSettings is an array, we want to upsert them
    const { error: settingsError } = await supabase.from('site_settings').upsert(siteSettings);
    if (settingsError) throw settingsError;

    console.log('Migration successful!');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

migrate();
