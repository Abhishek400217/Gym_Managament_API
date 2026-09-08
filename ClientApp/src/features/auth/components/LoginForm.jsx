import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi'
import InputField from '../../../components/common/InputField'
import Button from '../../../components/common/Button'
import RememberMeRow from './RememberMeRow'
import styles from './LoginForm.module.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

// Owns form state + validation. Stays agnostic about *how* login happens — Feature 3's Axios call plugs
// into the parent's onSubmit without touching this file's logic.
function LoginForm({ onSubmit, loading, success, authError }) {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    else if (formData.password.length < 5) newErrors.password = 'Minimum 5 characters'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ ...formData, remember })
    }
  }

  return (
    <motion.form onSubmit={handleSubmit} noValidate variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <InputField
          label="Username"
          type="text"
          name="username"
          icon={FiUser}
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          success={touched.username && !errors.username && formData.username.length > 0}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <InputField
          label="Password"
          type="password"
          name="password"
          icon={FiLock}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          success={touched.password && !errors.password && formData.password.length > 0}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RememberMeRow remember={remember} onRememberChange={(e) => setRemember(e.target.checked)} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button type="submit" loading={loading} success={success} icon={FiArrowRight}>
          Sign In
        </Button>
      </motion.div>

      {authError && <p className={styles.authError} role="alert">{authError}</p>}
    </motion.form>
  )
}

export default LoginForm