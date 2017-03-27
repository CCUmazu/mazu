<?php

use Illuminate\Database\Seeder;

class bookCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void

















     */
    public function run()
    {
        DB::table('bookCategory')->insert(['category' => '1-0-0', 'name' => '通論']);
        DB::table('bookCategory')->insert(['category' => '2-0-0', 'name' => '信仰與經典']);
        DB::table('bookCategory')->insert(['category' => '3-0-0', 'name' => '媽祖文化與比較研究']);
        DB::table('bookCategory')->insert(['category' => '4-0-0', 'name' => '歷史、事蹟與傳說']);
        DB::table('bookCategory')->insert(['category' => '5-0-0', 'name' => '儀式與祭典']);
        DB::table('bookCategory')->insert(['category' => '6-0-0', 'name' => '進香']);
        DB::table('bookCategory')->insert(['category' => '7-0-0', 'name' => '祭祀活動與組織']);
        DB::table('bookCategory')->insert(['category' => '8-0-0', 'name' => '媽祖廟糾紛與爭論']);
        DB::table('bookCategory')->insert(['category' => '9-0-0', 'name' => '兩岸交流']);
        DB::table('bookCategory')->insert(['category' => '10-0-0', 'name' => '媽祖信仰與政治']);
        DB::table('bookCategory')->insert(['category' => '11-0-0', 'name' => '媽祖信仰的傳播']);
        DB::table('bookCategory')->insert(['category' => '12-0-0', 'name' => '觀光與文化政策']);
        DB::table('bookCategory')->insert(['category' => '13-0-0', 'name' => '信仰與社區組織']);
        DB::table('bookCategory')->insert(['category' => '14-0-0', 'name' => '區域媽祖廟研究']);
        DB::table('bookCategory')->insert(['category' => '15-0-0', 'name' => '單一媽祖廟研究(含廟誌)']);
        DB::table('bookCategory')->insert(['category' => '16-0-0', 'name' => '建築、藝術']);
        DB::table('bookCategory')->insert(['category' => '17-0-0', 'name' => '社會經濟']);
        DB::table('bookCategory')->insert(['category' => '18-0-0', 'name' => '其它']);
    }
}
