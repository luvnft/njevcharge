import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const EVChargingCalculator = () => {
  const [batteryCapacity, setBatteryCapacity] = useState(77);
  const [amperage, setAmperage] = useState(16);
  const [voltage, setVoltage] = useState(230);
  const [initialCharge, setInitialCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);

  const [chargingPower, setChargingPower] = useState(0);
  const [chargingSpeed, setChargingSpeed] = useState(0);
  const [hoursNeeded, setHoursNeeded] = useState(0);

  useEffect(() => {
    // Calculate charging power in kW for three-phase charging
    const power = (3 * amperage * voltage) / 1000;
    setChargingPower(power);

    // Calculate charging speed (% per hour)
    const speed = (power / batteryCapacity) * 100;
    setChargingSpeed(speed);

    // Calculate hours needed
    const chargeNeeded = targetCharge - initialCharge;
    const hours = chargeNeeded / speed;
    setHoursNeeded(hours);
  }, [batteryCapacity, amperage, voltage, initialCharge, targetCharge]);

  const InputField = ({ label, value, onChange, min, max }) => (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min}
        max={max}
        style={styles.input}
      />
    </div>
  );

  InputField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.string,
    max: PropTypes.string
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>EV charging calculator</h2>

        <InputField
          label="Battery capacity (kWh)"
          value={batteryCapacity}
          onChange={setBatteryCapacity}
          min="0"
        />

        <div style={styles.twoColumns}>
          <InputField
            label="Charge current (A)"
            value={amperage}
            onChange={setAmperage}
            min="0"
          />
          <InputField
            label="Grid voltage (V)"
            value={voltage}
            onChange={setVoltage}
            min="0"
          />
        </div>

        <div style={styles.twoColumns}>
          <InputField
            label="Initial charge (%)"
            value={initialCharge}
            onChange={setInitialCharge}
            min="0"
            max="100"
          />
          <InputField
            label="Target charge (%)"
            value={targetCharge}
            onChange={setTargetCharge}
            min="0"
            max="100"
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
            <span style={styles.resultValue}>{Math.floor(hoursNeeded)} hours {Math.round((hoursNeeded % 1) * 60)} minutes ({hoursNeeded.toFixed(1)} hours)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingCalculator;
