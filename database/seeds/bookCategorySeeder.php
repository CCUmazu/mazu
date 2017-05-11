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
        DB::table('bookCategory')->insert(['name' => '通論']);
        DB::table('bookCategory')->insert(['name' => '信仰與經典']);
        DB::table('bookCategory')->insert(['name' => '媽祖文化與比較研究']);
        DB::table('bookCategory')->insert(['name' => '歷史、事蹟與傳說']);
        DB::table('bookCategory')->insert(['name' => '儀式與祭典']);
        DB::table('bookCategory')->insert(['name' => '進香']);
        DB::table('bookCategory')->insert(['name' => '祭祀活動與組織']);
        DB::table('bookCategory')->insert(['name' => '媽祖廟糾紛與爭論']);
        DB::table('bookCategory')->insert(['name' => '兩岸交流']);
        DB::table('bookCategory')->insert(['name' => '媽祖信仰與政治']);
        DB::table('bookCategory')->insert(['name' => '媽祖信仰的傳播']);
        DB::table('bookCategory')->insert(['name' => '觀光與文化政策']);
        DB::table('bookCategory')->insert(['name' => '信仰與社區組織']);
        DB::table('bookCategory')->insert(['name' => '區域媽祖廟研究']);
        DB::table('bookCategory')->insert(['name' => '單一媽祖廟研究(含廟誌)']);
        DB::table('bookCategory')->insert(['name' => '建築、藝術']);
        DB::table('bookCategory')->insert(['name' => '社會經濟']);
        DB::table('bookCategory')->insert(['name' => '其它']);
    }
}
