<?php

namespace App\Http\Controllers;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Redirect;
use App\Objects\Book;

/*
* the new use
*/
use Auth;
use DB;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Objects\Category;


class DownloadController extends Controller
{
    public function ris($id)
    {
        $temp = Book::getOne($id);
        $bookData = $temp['bookData'];
        $data  = "TY  -\r\nTI  -\r\nAB  -\r\nC1  -\r\nEP  -\r\nIS  -\r\nSN  -\r\nSP  -\r\nT2  -\r\nUR  -\r\nVL  -\r\nER  -\r\n";
        $data .= "AU  - ".$bookData->author."\r\n";
        $data .= "ED  - ".$bookData->editor."\r\n";
        $data .= "M3  - ".$bookData->type."\r\n";
        $data .= "PB  - ".$bookData->publisher."\r\n";
        $data .= "PP  - ".$bookData->publishingLocation."\r\n";
        $data .= "PY  - ".$bookData->publicationDate."\r\n";
        $data .= "T2  - ".$bookData->bookName."\r\n";
        $data .= "TI  - ".$bookData->title."\r\n";
        $data .= "VL  - ".$bookData->chapter."\r\n";
        $data .= "SP  - ".$bookData->page."\r\n";
        $data .= "SN  - ".$bookData->ISBN."/".$bookData->ISSN."\r\n";
        /*
         *  TH - type
         *  AU - author
         *  PY - publicationDate
         *  TI - title
         *  T2 - bookName
         *  ED - editor
         *  PP - publishingLocation
         *  PB - publisher
         *     - period
         *  VL - chapter
         *  SP - page
         *     - department
         *     - thesis
         *  SN  - ISBN / ISSN
         * */
        Storage::disk('local')->delete('/public/ris/'.$id.'.ris');
        Storage::disk('local')->put('/public/ris/'.$id.'.ris', $data);
        $path = storage_path('/app/public/ris/'.$id.'.ris');
        return response()->download($path);
    }
}