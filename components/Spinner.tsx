import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export default function Spinner({ size = 24, color = 'var(--primary)' }: SpinnerProps) {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderColor: `${color}33`,
        borderTopColor: color,
      }}
    />
  );
}
