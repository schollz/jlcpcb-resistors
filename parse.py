import json

data = json.load(open("data.json"))
print(data)
resistors = []
for resistor in data:
    manufacturer = resistor["col3"].split()[0]
    print(resistor["col5"])
    fields = resistor["col5"].split()
    omega = "Ω"
    # find field with omega
    value = None
    for field in fields:
        if omega in field:
            value = field
            break
    print(value)
    # remove omega
    value = value.replace(omega, "")
    # convert 1k to 1000
    if "k" in value:
        value = value.replace("k", "")
        value = float(value) * 1000
    elif "M" in value:
        value = value.replace("M", "")
        value = float(value) * 1000000
    elif "m" in value:
        value = value.replace("m", "")
        value = float(value) / 1000
    else:
        value = float(value)
    resistors.append(
        {
            "manufacturer": manufacturer,
            "href": resistor["href"],
            "value": value,
        }
    )

with open("resistors.json", "w") as f:
    json.dump(resistors, f, indent=2)
