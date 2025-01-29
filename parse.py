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

    size = "0603"
    if "0603" in resistor["col5"]:
        size = "0603"
    elif "0805" in resistor["col5"]:
        size = "0805"
    elif "1206" in resistor["col5"]:
        size = "1206"
    elif "0402" in resistor["col5"]:
        size = "0402"
    elif "0201" in resistor["col5"]:
        size = "0201"
    elif "2512" in resistor["col5"]:
        size = "2512"
    elif "1210" in resistor["col5"]:
        size = "1210"
    elif "2010" in resistor["col5"]:
        size = "2010"
    elif "2512" in resistor["col5"]:
        size = "2512"

    resistors.append(
        {
            "manufacturer": manufacturer,
            "href": resistor["href"],
            "value": value,
            "size": size,
        }
    )

# coalesce resistors by value
resistors_by_value = {}
for resistor in resistors:
    if resistor["value"] not in resistors_by_value:
        resistors_by_value[int(resistor["value"])] = []
    resistors_by_value[int(resistor["value"])].append(resistor)

with open("resistors_by_value.json", "w") as f:
    json.dump(resistors_by_value, f, indent=2)
