import styles from './ExperienceText.module.css';

const ExperienceText = () => {
  return (
    <div className={styles.experienceContainer}>
      <div className={styles.experienceText}>
        Get an experience like never before with <span className={styles.islandhop}>Islandhop</span>
      </div>
    </div>
  );
};

export default ExperienceText;
