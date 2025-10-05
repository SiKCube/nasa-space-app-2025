import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function RealAsteroids({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asteroides reales</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {
            data ?
              data.map((asteroid: any) => {
                return (
                  <li>
                    <b>{asteroid.name}</b>
                    <p><b>Diametro:</b> {asteroid.diameter}</p>
                    <p><b>Velocity:</b> {asteroid.velocity}</p>
                  </li>
                )
              })
              :
              "NO DATA"
          }
        </ul>
      </CardContent>
    </Card>
  )
}