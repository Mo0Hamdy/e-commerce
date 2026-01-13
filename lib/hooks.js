import { useDispatch, useSelector, useStore } from 'react-redux'

// Use throughout your app instead of plain `useDispatch`, `useSelector`, and `useStore`
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
export const useAppStore = useStore