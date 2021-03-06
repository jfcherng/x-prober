import CardGrid from '@/Card/src/components/card-grid'
import { GUTTER } from '@/Config/src'
import { gettext } from '@/Language/src'
import { device } from '@/Style/src/components/devices'
import template from '@/Utils/src/components/template'
import React from 'react'
import styled from 'styled-components'
import store from '../stores'
interface StyledSysLoadGroupProps {
  isCenter: boolean
}
export const StyledSysLoadGroup = styled.div<StyledSysLoadGroupProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device('tablet')} {
    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'flex-start')};
  }
`
export const StyledSysLoadGroupItem = styled.span`
  margin-right: 0.5rem;
  background: ${({ theme }) => theme['sysLoad.bg']};
  color: ${({ theme }) => theme['sysLoad.fg']};
  padding: calc(${GUTTER} / 10) calc(${GUTTER} / 1.5);
  border-radius: 10rem;
  font-family: 'Arial Black';
  font-weight: 700;
  @media ${device('tablet')} {
    padding: calc(${GUTTER} / 10) ${GUTTER};
  }
`
interface SysLoadGroupProps {
  sysLoad: number[]
  isCenter: boolean
}
export const SysLoadGroup = ({ sysLoad, isCenter }: SysLoadGroupProps) => {
  const minutes = [1, 5, 15]
  const loadHuman = sysLoad.map((load, i) => {
    return {
      id: `${minutes[i]}minAvg`,
      load,
      text: template(gettext('{{minute}} minute average'), {
        minute: minutes[i],
      }),
    }
  })
  return (
    <StyledSysLoadGroup isCenter={isCenter}>
      {loadHuman.map(({ id, load, text }) => (
        <StyledSysLoadGroupItem key={id} title={text}>
          {load.toFixed(2)}
        </StyledSysLoadGroupItem>
      ))}
    </StyledSysLoadGroup>
  )
}
interface SystemLoadProps {
  isCenter?: boolean
}
const SystemLoad = ({ isCenter = false }: SystemLoadProps) => {
  return (
    <CardGrid name={gettext('System load')} tablet={[1, 1]}>
      <SysLoadGroup isCenter={isCenter} sysLoad={store.sysLoad} />
    </CardGrid>
  )
}
export default SystemLoad
