<?php
function removeNonAsciiCharsFromFileUpload( $filename ) {
    $info = pathinfo( $filename );
    $ext  = empty( $info['extension'] ) ? '' : '.' . $info['extension'];
    $name = basename( $filename, $ext );

    // Change letters to lower case
    $name = mb_strtolower($name,'UTF-8');

    // Replace czech and slovak characters with standards (expandable)
    $name = str_replace(
        array('á','ä','č','ď','ě','é','í','ĺ','ľ','ň','ó','ô','ř','ŕ','š','ť','ú','ů','ý','ž','_',' '),
        array('a','a','c','d','e','e','i','l','l','n','o','o','r','r','s','t','u','u','y','z','-','-'), $name);

    // Delete the rest of non-allowed characters
    $name = preg_replace('/[^a-z0-9\-]/', "", $name);

    // If there are 2 "-" text to each other, replace them with 1
    $name = preg_replace('/(\-){2,}/', "-", $name);

    // In case the file name would be empty, rename it to its MD5 hash
    if(strlen($name) == 0 || $name == "-"){
        $name = md5($filename);
    }

    return $name . $ext;
}
