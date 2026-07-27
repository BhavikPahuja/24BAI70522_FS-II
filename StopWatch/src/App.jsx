import { useEffect, useRef, useState } from "react"
function formatTime(totalMilliseconds) {
  const minutes = Math.floor(totalMilliseconds / 60000)
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10)

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}:${String(milliseconds).padStart(2, "0")}`
}

function App() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }

      return undefined
    }

    startTimeRef.current = performance.now() - elapsed
    intervalRef.current = window.setInterval(() => {
      setElapsed(Math.round(performance.now() - startTimeRef.current))
    }, 16)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [running])

  function startStopwatch() {
    setRunning(true)
  }

  function pauseStopwatch() {
    setRunning(false)
  }

  function resetStopwatch() {
    setRunning(false)
    setElapsed(0)
    setLaps([])
  }

  function recordLap() {
    if (!running || elapsed === 0) {
      return
    }

    setLaps((currentLaps) => [
      { id: Date.now(), time: elapsed },
      ...currentLaps,
    ])
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Stopwatch</span>
          <h1>Measure study sprints, coding bursts, and break time.</h1>
          <p>
            The timer is built with the same simple hook-driven style used in
            CampusHub, with a clean control layout and lap history.
          </p>
        </div>

        <div className="meter-card">
          <span className="meter-label">Current session</span>
          <strong className="timer-display">{formatTime(elapsed)}</strong>
          <div className="meter-actions">
            <button type="button" className="primary-button" onClick={startStopwatch}>
              Start
            </button>
            <button type="button" className="secondary-button" onClick={pauseStopwatch}>
              Stop
            </button>
          </div>
        </div>
      </section>

      <section className="panel stopwatch-panel">
        <div className="controls">
          <button type="button" className="control-button" onClick={recordLap}>
            Lap
          </button>
          <button type="button" className="control-button" onClick={resetStopwatch}>
            Reset
          </button>
        </div>

        <div className="lap-summary">
          <article className="summary-card">
            <span>Running</span>
            <strong>{running ? "Yes" : "No"}</strong>
          </article>
          <article className="summary-card">
            <span>Lap count</span>
            <strong>{laps.length}</strong>
          </article>
          <article className="summary-card">
            <span>Best lap</span>
            <strong>{laps.length ? formatTime(laps[0].time) : "--:--:--"}</strong>
          </article>
        </div>

        <div className="lap-list">
          {laps.length ? (
            laps.map((lap, index) => (
              <div key={lap.id} className="lap-item">
                <span>Lap {laps.length - index}</span>
                <strong>{formatTime(lap.time)}</strong>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <h2>No laps yet</h2>
              <p>Start the clock and capture splits while you work.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
