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
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  touch-action: none;
`

const DragHandleArea = styled.div`
  padding: 20px 0;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    cursor: grabbing;
  }
`

const DragHandle = styled.div`
  width: 81px;
  height: 3px;
  background: #D1D9E8;
  border-radius: 2.5px;
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
  maxHeight = window.innerHeight * 0.8,
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

    // 30-40px 임계값: 조금만 드래그해도 상태 전환
    const threshold = 35
    const dragDistance = height - startHeight.current

    // 작게보기 상태에서 위로 당기면 → 크게보기로 전환
    if (startHeight.current <= minHeight + 10 && dragDistance >= threshold) {
      setHeight(maxHeight)
    }
    // 크게보기 상태에서 아래로 당기면 → 작게보기로 전환
    else if (startHeight.current >= maxHeight - 10 && dragDistance <= -threshold) {
      setHeight(minHeight)
    }
    // 임계값 미달이면 원래 상태로 복귀
    else if (Math.abs(height - minHeight) < Math.abs(height - maxHeight)) {
      setHeight(minHeight)
    } else {
      setHeight(maxHeight)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newMaxHeight = window.innerHeight * 0.8
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
      <DragHandleArea
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <DragHandle />
      </DragHandleArea>
      <Content style={{ height: `${height - 60}px` }}>
        {children}
      </Content>
    </Container>
  )
}
