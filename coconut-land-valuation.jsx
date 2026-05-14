import { useState, useMemo } from "react";

const SQMT_PER_ACRE = 4046.86;
const SQMT_PER_HECTARE = 10000;
const SQMT_PER_SQMT = 1;
const FEET_TO_METERS = 0.3048;

function formatCurrency(val) {
  if (val >= 1e7) return `₹${(val / 1e7).toFixed(2)} Cr`;
  if (val >= 1e5) return `₹${(val / 1e5).toFixed(2)} L`;
  return `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function InputField({ label, value, onChange, unit, min = 0, step = 1, icon }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: "block",
        fontSize: 11,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#6b5e4c",
        marginBottom: 6,
      }}>
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          style={{
            flex: 1,
            padding: "12px 14px",
            fontSize: 18,
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            border: "2px solid #d4c9b0",
            borderRadius: unit ? "10px 0 0 10px" : "10px",
            background: "#faf6ef",
            color: "#3a3226",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "#8b7355"}
          onBlur={e => e.target.style.borderColor = "#d4c9b0"}
        />
        {unit && (
          <span style={{
            padding: "12px 14px",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            background: "#e8dfc9",
            color: "#6b5e4c",
            border: "2px solid #d4c9b0",
            borderLeft: "none",
            borderRadius: "0 10px 10px 0",
            whiteSpace: "nowrap",
          }}>{unit}</span>
        )}
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, #3a5a30 0%, #4a6e3a 100%)" : "#faf6ef",
      borderRadius: 14,
      padding: accent ? "22px 20px" : "18px 20px",
      border: accent ? "none" : "2px solid #d4c9b0",
      transition: "transform 0.2s",
    }}>
      <div style={{
        fontSize: 11,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: accent ? "rgba(255,255,255,0.7)" : "#8b7355",
        marginBottom: 6,
      }}>{label}</div>
      <div style={{
        fontSize: accent ? 26 : 22,
        fontFamily: "'Fraunces', serif",
        fontWeight: 700,
        color: accent ? "#fff" : "#3a3226",
        lineHeight: 1.2,
      }}>{value}</div>
      {sub && <div style={{
        fontSize: 12,
        fontFamily: "'DM Sans', sans-serif",
        color: accent ? "rgba(255,255,255,0.6)" : "#8b7355",
        marginTop: 4,
      }}>{sub}</div>}
    </div>
  );
}

export default function CoconutValuation() {
  const [spacing, setSpacing] = useState(8);
  const [spacingUnit, setSpacingUnit] = useState("meters");
  const [yieldPerTree, setYieldPerTree] = useState(80);
  const [pricePerCoconut, setPricePerCoconut] = useState(25);
  const [targetROI, setTargetROI] = useState(10);
  const [unit, setUnit] = useState("acre");

  const results = useMemo(() => {
    if (spacing <= 0 || yieldPerTree <= 0 || pricePerCoconut <= 0 || targetROI <= 0) {
      return null;
    }

    const spacingMeters = spacingUnit === "feet" ? spacing * FEET_TO_METERS : spacing;
    const areaPerTree = spacingMeters * spacingMeters; // sq meters

    const unitArea =
      unit === "acre" ? SQMT_PER_ACRE :
      unit === "hectare" ? SQMT_PER_HECTARE :
      SQMT_PER_SQMT;

    const treesPerUnit = Math.floor(unitArea / areaPerTree);
    const totalCoconuts = treesPerUnit * yieldPerTree;
    const annualRevenue = totalCoconuts * pricePerCoconut;
    const maxLandPrice = annualRevenue / (targetROI / 100);

    return {
      treesPerUnit,
      totalCoconuts,
      annualRevenue,
      maxLandPrice,
    };
  }, [spacing, spacingUnit, yieldPerTree, pricePerCoconut, targetROI, unit]);

  const unitLabels = { acre: "Acre", hectare: "Hectare" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #f5efe3 0%, #ede4d3 40%, #e6ddc8 100%)",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 20px 40px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 42, marginBottom: 4 }}>🥥</div>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#3a3226",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}>
            Coconut Land Valuator
          </h1>
          <p style={{
            fontSize: 14,
            color: "#8b7355",
            margin: 0,
            fontStyle: "italic",
            fontFamily: "'Fraunces', serif",
          }}>
            What should you pay for plantation land?
          </p>
        </div>

        {/* Inputs Section */}
        <div style={{
          background: "#fff",
          borderRadius: 18,
          padding: "24px 22px 6px",
          boxShadow: "0 2px 20px rgba(90,70,40,0.07)",
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#3a5a30",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{
              width: 20, height: 2,
              background: "#3a5a30",
              borderRadius: 1,
              display: "inline-block",
            }} />
            Plantation Parameters
          </div>

          {/* Distance with unit toggle */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: "block",
              fontSize: 11,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6b5e4c",
              marginBottom: 6,
            }}>
              <span style={{ marginRight: 6 }}>📏</span>
              Distance Between Trees
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <input
                type="number"
                value={spacing}
                min={1}
                step={0.5}
                onChange={e => setSpacing(parseFloat(e.target.value) || 0)}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  fontSize: 18,
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                  border: "2px solid #d4c9b0",
                  borderRadius: "10px 0 0 10px",
                  background: "#faf6ef",
                  color: "#3a3226",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#8b7355"}
                onBlur={e => e.target.style.borderColor = "#d4c9b0"}
              />
              {["feet", "meters"].map((u, i) => (
                <button
                  key={u}
                  onClick={() => setSpacingUnit(u)}
                  style={{
                    padding: "12px 12px",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    background: spacingUnit === u ? "#3a5a30" : "#e8dfc9",
                    color: spacingUnit === u ? "#fff" : "#6b5e4c",
                    border: "2px solid",
                    borderColor: spacingUnit === u ? "#3a5a30" : "#d4c9b0",
                    borderLeft: "none",
                    borderRadius: i === 1 ? "0 10px 10px 0" : 0,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >{u === "feet" ? "ft" : "m"}</button>
              ))}
            </div>
          </div>
          <InputField
            label="Yield Per Tree Per Year"
            value={yieldPerTree}
            onChange={setYieldPerTree}
            unit="coconuts"
            min={1}
            icon="🌴"
          />
          <InputField
            label="Sale Price Per Coconut"
            value={pricePerCoconut}
            onChange={setPricePerCoconut}
            unit="₹"
            min={0.5}
            step={0.5}
            icon="💰"
          />
        </div>

        <div style={{
          background: "#fff",
          borderRadius: 18,
          padding: "24px 22px 6px",
          boxShadow: "0 2px 20px rgba(90,70,40,0.07)",
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8b7355",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{
              width: 20, height: 2,
              background: "#8b7355",
              borderRadius: 1,
              display: "inline-block",
            }} />
            Investment Criteria
          </div>

          <InputField
            label="Target Annual ROI"
            value={targetROI}
            onChange={setTargetROI}
            unit="%"
            min={1}
            step={0.5}
            icon="📈"
          />

          {/* Unit selector */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6b5e4c",
              marginBottom: 8,
            }}>
              🗺️ Land Unit
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {[["acre","Acre"], ["hectare","Hectare"]].map(([u, lbl]) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    border: unit === u ? "2px solid #3a5a30" : "2px solid #d4c9b0",
                    borderRadius: 10,
                    background: unit === u ? "#3a5a30" : "transparent",
                    color: unit === u ? "#fff" : "#6b5e4c",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}>
              <ResultCard
                label={`Trees / ${unitLabels[unit]}`}
                value={results.treesPerUnit.toLocaleString("en-IN")}
                sub={`${spacing}${spacingUnit === "feet" ? "ft" : "m"} × ${spacing}${spacingUnit === "feet" ? "ft" : "m"} grid`}
              />
              <ResultCard
                label="Coconuts / Year"
                value={results.totalCoconuts.toLocaleString("en-IN")}
                sub={`${yieldPerTree} per tree`}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <ResultCard
                label={`Annual Revenue / ${unitLabels[unit]}`}
                value={formatCurrency(results.annualRevenue)}
                sub={`${results.totalCoconuts.toLocaleString("en-IN")} × ₹${pricePerCoconut}`}
              />
            </div>

            <div>
              <ResultCard
                label={`Max Land Price / ${unitLabels[unit]} for ${targetROI}% ROI`}
                value={formatCurrency(results.maxLandPrice)}
                sub={`Pay up to this to achieve your target return`}
                accent
              />
            </div>

            {/* Explanation */}
            <div style={{
              marginTop: 16,
              padding: "16px 18px",
              background: "rgba(58,90,48,0.06)",
              borderRadius: 12,
              borderLeft: "3px solid #3a5a30",
            }}>
              <div style={{
                fontSize: 12,
                fontFamily: "'DM Sans', sans-serif",
                color: "#5a4e3a",
                lineHeight: 1.7,
              }}>
                <strong style={{ color: "#3a5a30" }}>How it works:</strong> If annual coconut revenue per {unitLabels[unit].toLowerCase()} is{" "}
                <strong>{formatCurrency(results.annualRevenue)}</strong>, then to earn a{" "}
                <strong>{targetROI}%</strong> return, you'd divide revenue by{" "}
                {targetROI / 100} = <strong>{formatCurrency(results.maxLandPrice)}</strong>.
                Paying more means a lower return; paying less means a higher one.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
