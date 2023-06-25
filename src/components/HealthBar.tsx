import { healthBarProps } from "../types/componentTypes";

export default function HealthBar({ barWidth, currHP, maxHP, name }: healthBarProps) {
    return (
        <div className="health-bar">
            <div className="bar" style={{ width: `${barWidth}%` }}></div>
            <div className="hit" style={{ width: `${0}%` }}></div>

            <div
                style={{
                    top: "5px",
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <p>{name}</p>
                <p>
                    {currHP} / {maxHP}
                </p>
            </div>
        </div>
    );
}
