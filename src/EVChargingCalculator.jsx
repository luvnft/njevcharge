import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

// InputField component
const InputField = ({ label, value, onChange, min, max }) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0
    onChange(newValue)
  }

  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}: <strong>{value}</strong></label>
      <input
        type='range'
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        style={styles.input}
      />
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
}

const SelectField = ({ label, value, onChange, options }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}:</label>
      <select value={value} onChange={handleChange} style={styles.input}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

const EVChargingCalculator = () => {
  const [phases, setPhases] = useState(3)
  const [batteryCapacity, setBatteryCapacity] = useState(77)
  const [amperage, setAmperage] = useState(16)
  const [voltage, setVoltage] = useState(230)
  const [initialCharge, setInitialCharge] = useState(20)
  const [targetCharge, setTargetCharge] = useState(80)

  // Dynamically calculate values instead of storing them in state
  const chargingPower = (phases * amperage * voltage) / 1000 // in kW
  const chargingSpeed = (chargingPower / batteryCapacity) * 100 // % per hour
  const chargeNeeded = targetCharge - initialCharge // % needed
  const hoursNeeded = chargeNeeded / chargingSpeed // total hours required

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>EV Charging Calculator</h2>

        <InputField
          label='Battery capacity (kWh)'
          value={batteryCapacity}
          onChange={setBatteryCapacity}
          min={0}
        />

        <SelectField
          label='Phases'
          value={phases}
          onChange={setPhases}
          options={[1, 3]}
        />

        <div style={styles.twoColumns}>
          <InputField
            label='Charge current (A)'
            value={amperage}
            onChange={setAmperage}
            min={0}
            max={16}
          />
          <InputField
            label='Grid voltage (V)'
            value={voltage}
            onChange={setVoltage}
            min={220}
            max={240}
          />
        </div>

        <div style={styles.twoColumns}>
          <InputField
            label='Initial charge (%)'
            value={initialCharge}
            onChange={setInitialCharge}
            min={0}
            max={100}
          />
          <InputField
            label='Target charge (%)'
            value={targetCharge}
            onChange={setTargetCharge}
            min={0}
            max={100}
          />
        </div>

        <div style={styles.results}>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Charging power:</span>
            <span style={styles.resultValue}>{chargingPower.toFixed(1)} kW</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Charging speed:</span>
            <span style={styles.resultValue}>{chargingSpeed.toFixed(1)}% per hour</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Time needed:</span>
            <span style={styles.resultValue}>
              {Math.floor(hoursNeeded)} hours {Math.round((hoursNeeded % 1) * 60)} minutes (
              {hoursNeeded.toFixed(1)} hours)
            </span>
          </div>
        </div>
        <div style={styles.githubLink}>
          <a
            href='https://github.com/ltpk/ev-charging-calc'
            target='_blank'
            rel='noopener noreferrer'
            style={styles.link}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default EVChargingCalculator
