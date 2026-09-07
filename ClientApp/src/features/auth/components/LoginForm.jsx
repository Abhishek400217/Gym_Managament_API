import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock } from 'react-icons/fi'
import InputField from '../../../components/common/InputField'
import Button from '../../../components/common/Button'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

// Owns form state + validation. Stays agnostic about *how* login happens — API wiring lands in Feature 3
// without touching this file's logic, just the parent's onSubmit handler.
function LoginForm({ onSubmit, loading, success }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData)
    }
  }

  return (
    <motion.form onSubmit={handleSubmit} noValidate variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <InputField
          label="Email address"
          type="email"
          name="email"
          icon={FiMail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          success={touched.email && !errors.email && formData.email.length > 0}
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
        <Button type="submit" loading={loading} success={success}>
          Sign In
        </Button>
      </motion.div>
    </motion.form>
  )
}

export default LoginForm