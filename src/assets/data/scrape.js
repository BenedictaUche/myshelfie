import { load } from 'cheerios'
import puppeteer from 'pupperteer'

const testUrl = 'https://medium.com/@benedictacodes/simplify-your-search-bar-with-react-usestate-hooks-5c577697fe6d'

export default async function handler(req, res) {
    const method = req.method
    if (method === 'GET') {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        await page.goto(testUrl)
        const html = await page.content()

        const $ = load(html);
    } else {
        res.send('Method not allowed')
    }
}