import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ComplexityTableProps {
  timeComplexity: { operation: string; complexity: string }[]
  spaceComplexity: string
}

export default function ComplexityTable({ timeComplexity, spaceComplexity }: ComplexityTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Operation</TableHead>
            <TableHead>Time Complexity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeComplexity.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.operation}</TableCell>
              <TableCell>{item.complexity}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Space Complexity</TableCell>
            <TableCell>{spaceComplexity}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

