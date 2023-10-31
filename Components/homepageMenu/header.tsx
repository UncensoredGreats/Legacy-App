import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'

import Tabs from './headerParts/Tabs';
import HamburgerMenu from './headerParts/HamburgerMenu';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const HeaderProp = () => {

  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop: '25px', paddingBottom: '10px' }}>
        <Tabs />
        <HamburgerMenu />
    </div>
  );
};

export default HeaderProp;