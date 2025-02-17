import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#666'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  twoColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  results: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '4px',
    marginTop: '20px'
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  resultLabel: {
    color: '#666',
    fontSize: '14px'
  },
  resultValue: {
    fontWeight: 'bold'
  }
};

const EVChargingCalculator = () => {
  const [batteryCapacity, setBatteryCapacity] = useState(75);
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Three-Phase EV Charging Calculator</h2>

        <InputField
          label="Battery Capacity (kWh)"
          value={batteryCapacity}
          onChange={setBatteryCapacity}
          min="0"
        />

        <div style={styles.twoColumns}>
          <InputField
            label="Amperage per Phase (A)"
            value={amperage}
            onChange={setAmperage}
            min="0"
          />
          <InputField
            label="Voltage per Phase (V)"
            value={voltage}
            onChange={setVoltage}
            min="0"
          />
        </div>

        <div style={styles.twoColumns}>
          <InputField
            label="Initial Charge (%)"
            value={initialCharge}
            onChange={setInitialCharge}
            min="0"
            max="100"
          />
          <InputField
            label="Target Charge (%)"
            value={targetCharge}
            onChange={setTargetCharge}
            min="0"
            max="100"
          />
        </div>

        <div style={styles.results}>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Three-Phase Power:</span>
            <span style={styles.resultValue}>{chargingPower.toFixed(1)} kW</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Charging Speed:</span>
            <span style={styles.resultValue}>{chargingSpeed.toFixed(1)}% per hour</span>
          </div>
          <div style={styles.resultRow}>
            <span style={styles.resultLabel}>Time Needed:</span>
            <span style={styles.resultValue}>{hoursNeeded.toFixed(1)} hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingCalculator;
