import type { ReactNode } from 'react'
import { useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'

interface BottomSheetProps {
  children: ReactNode
  minHeight?: number
  maxHeight?: number
  initialHeight?: number
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  touch-action: none;
`

const DragHandle = styled.div`
  width: 48px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: ${({ theme }) => theme.spacing.md} auto ${({ theme }) => theme.spacing.sm};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`

const Content = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

export default function BottomSheet({
  children,
  minHeight = 160,
  maxHeight = window.innerHeight * 0.85,
  initialHeight = 160,
}: BottomSheetProps) {
  const [height, setHeight] = useState(initialHeight)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const startHeight = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    startY.current = e.touches[0].clientY
    startHeight.current = height
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaY = startY.current - e.touches[0].clientY
    const newHeight = Math.min(Math.max(startHeight.current + deltaY, minHeight), maxHeight)
    setHeight(newHeight)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    // 스냅 효과: minHeight나 maxHeight에 가까우면 스냅
    const snapThreshold = 50
    if (Math.abs(height - minHeight) < snapThreshold) {
      setHeight(minHeight)
    } else if (Math.abs(height - maxHeight) < snapThreshold) {
      setHeight(maxHeight)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newMaxHeight = window.innerHeight * 0.85
      if (height > newMaxHeight) {
        setHeight(newMaxHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [height])

  useEffect(() => {
    setHeight(initialHeight)
  }, [initialHeight])

  return (
    <Container
      ref={containerRef}
      style={{ height: `${height}px` }}
    >
      <DragHandle
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <Content style={{ height: `${height - 32}px` }}>
        {children}
      </Content>
    </Container>
  )
}
