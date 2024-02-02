class PuzzlesPage {

    public get puzzlesMessage() {
        return $('//android.widget.TextView[@text="Over 45 daily interactive puzzles – plus play for prizes"]')
    }
}

export default new PuzzlesPage()