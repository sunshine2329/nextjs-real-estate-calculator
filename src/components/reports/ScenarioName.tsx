'use client'

import { Button, Input } from '@/components'
import React, { useEffect, useState } from 'react'
import useScenarioName from '@/providers/reports/useScenarioName'
import { TReportParams, TScenario, TScenarioParams } from '@/types'

const ScenarioName = ({
  scenario,
  params
}: {
  scenario?: TScenario
  params: TReportParams | TScenarioParams
}) => {
  const { saving, deleting, saveScenarioName, deleteScenario } = useScenarioName(params)
  const [name, setName] = useState(scenario ? scenario.name : '')

  useEffect(() => {
    setName(scenario ? scenario.name : '')
  }, [scenario])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveScenarioName(name)
  }

  return (
    <form className="w-full flex-col space-y-4 m-auto mt-10 mb-10" onSubmit={handleSubmit}>
      <div className="flex space-x-4 items-end mx-2">
        <Input
          label="Scenario Name"
          id="name"
          name="name"
          placeholder="Scenario Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button type="submit" loading={saving} disabled={deleting}>
          Save
        </Button>
        {(params as TScenarioParams).scenarioId && (
          <Button type="button" loading={deleting} disabled={saving} onClick={deleteScenario}>
            Delete
          </Button>
        )}
      </div>
    </form>
  )
}

export default ScenarioName
