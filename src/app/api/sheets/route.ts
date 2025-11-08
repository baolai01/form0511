import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1bfOezt962hqswkStbDx0ImsmIksQlXS8PB1BQqQ6_Q8';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxuktMRm1s95kqM1OSSxsWBXxSiRY64fJJW3TRe7PrI7Xgoi7cYOOUoF_tAHnAwUkom6w/exec';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action = 'update', value, row } = body;
        if (!value) {
            return NextResponse.json(null, { status: 400 });
        }
        const params = new URLSearchParams({
            sheetId: SHEET_ID,
            action,
            value: JSON.stringify(value)
        });
        if (row) {
            params.append('row', row);
        }
        const response = await axios.get(`${SHEET_URL}?${params}`);
        return NextResponse.json(response.data);
    } catch {
        return NextResponse.json({ error: 'lỗi proxy' }, { status: 500 });
    }
}
