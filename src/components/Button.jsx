function Button({ label, onClick, variant = 'default' }) {
  return (
    <button
      type="button"
      className={`btn-cinepolis ${variant === 'primary' ? 'btn-primary' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
