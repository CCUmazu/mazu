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
        $data .= "A1  - ".$bookData->author."\r\n";
        $data .= "A2  - ".$bookData->author."\r\n";
        $data .= "C1  - ".$bookData->title."\r\n";
        $data .= "CY  - ".$bookData->publishingLocation."\r\n";
        $data .= "ED  - ".$bookData->editor."\r\n";
        $data .= "EP  - ".$bookData->page."\r\n";
        $data .= "IS  - ".$bookData->chapter."\r\n";
        $data .= "PB  - ".$bookData->publisher.", ".$bookData->department."\r\n";
        $data .= "PP  - ".$bookData->publishingLocation."\r\n";
        $data .= "PY  - ".$bookData->publicationDate."\r\n";
        $data .= "SN  - ".$bookData->ISBN."/".$bookData->ISSN."\r\n";
        $data .= "SP  - ".$bookData->page."\r\n";
        $data .= "T2  - ".$bookData->bookName."\r\n";
        $data .= "TI  - ".$bookData->bookName."\r\n";
        $data .= "VL  - ".$bookData->period."\r\n";

        /*
         *  TY - type
         *  A1 - author
         *  A2 - author
         *  C1 - title
         *  CY - publishingLocation
         *  ED - editor
         *  EP - page
         *  IS - chapter
         *  PB - publisher, department
         *  PP - publishingLocation
         *  PY - publicationDate
         *  SN - ISBN / ISSN
         *  SP - page
         *  T2 - bookName
         *  TI - bookName
         *  VL - period
         *     - thesis
         * */
        Storage::disk('local')->delete('/public/ris/'.$id.'.ris');
        Storage::disk('local')->put('/public/ris/'.$id.'.ris', $data);
        $path = storage_path('/app/public/ris/'.$id.'.ris');
        return response()->download($path);
    }
}