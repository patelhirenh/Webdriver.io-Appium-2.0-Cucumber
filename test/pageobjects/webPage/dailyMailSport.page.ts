
class DailyMailSport{

    public get sportMenu() {
        return $('a[href="/sport/index.html"]')
    }

    public get premierLeagueTableLink() {
        return $('[href*="/premier-league/tables.html"]')
    }

    public get privacyPolicy() {
        return $$('a[href="/privacy"]')[0]
    }

    private posValue: string | null = null;
    private ptsValue: string | null = null;

    get getValues(): { posValue: string | null, ptsValue: string | null } {
        return { posValue: this.posValue, ptsValue: this.ptsValue };
    }

    set setValues({ posValue, ptsValue }: { posValue: string | null, ptsValue: string | null }) {
        this.posValue = posValue;
        this.ptsValue = ptsValue;
    }

    private getColumnIndex(headerColumns: string[], columnName: string): number {
        const columnIndex = headerColumns.indexOf(columnName) + 1;
    
        if (columnIndex === 0) {
        throw new Error(`Column '${columnName}' not found in the table header.`);
        }
        return columnIndex;
    }  
    
    public async searchTable(teamName: string): Promise<{ posValue: string | null, ptsValue: string | null }> {
        const teamRow = await $(`//tr[contains(@class, 'competitionTableRow_3Nd43') and contains(td[3], '${teamName}')]`);
        
        if (teamRow) {
            const headerColumns = await $$(`thead th`).map((el) => el.getText());
            const posColumnIndex = this.getColumnIndex(headerColumns, 'Pos');
            const ptsColumnIndex = this.getColumnIndex(headerColumns, 'PTS') + 1;
            const posValue = await teamRow.$(`td:nth-child(${posColumnIndex})`).getText();
            const ptsValue = await teamRow.$(`td:nth-child(${ptsColumnIndex})`).getText();
    
            console.log(`${teamName} Position (Pos): ${posValue}`);
            console.log(`${teamName} Points (PTS): ${ptsValue}`);
    
            this.setValues = { posValue, ptsValue };
    
            return this.setValues;
        } else {
            console.error(`Team '${teamName}' not found in the table.`);
            return { posValue: null, ptsValue: null };
        }
    }
    
}

export default new DailyMailSport()