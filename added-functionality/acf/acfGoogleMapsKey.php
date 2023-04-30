<?php

function customGoogleMapsKey() {

    global $themeSetup;
    acf_update_setting('google_api_key',  $themeSetup['googleMapsAPIKey']);
}

