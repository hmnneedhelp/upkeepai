import time

import overpass
import csv


def get_locs():
    # создаем объект для доступа к Overpass API
    api = overpass.API("https://overpass-api.de/api/interpreter", timeout=600)
    # area_query = 'area["name"="Кострома"]->.a; (way(area.a)["building"];); out geom;'
    area_query = 'area["name"="Москва"]->.a; (way(area.a)["building"];); out geom;'
    # отправляем запрос к API Overpass
    response = api.get(area_query)
    with open("geo_moscow.csv", "a") as f:
        writer = csv.writer(f, delimiter=";")
        for element in response["features"]:
            if element["properties"].get("addr:street") and element["properties"].get(
                "addr:housenumber"
            ):
                if element["geometry"]["coordinates"]:
                    writer.writerow(
                        [
                            element["properties"]["addr:street"],
                            element["properties"]["addr:housenumber"],
                            element["geometry"]["coordinates"],
                        ]
                    )


# with open('geo_moscow.csv', 'r') as f:
#     reader = csv.reader(f, delimiter=';')
#     for row in reader:
#         if "Красковский" in row[0]:
#             print(row)

import pandas as pd
import requests


file = pd.ExcelFile("mkd.xlsx")
a = file.parse("Sheet1")
counter = 990
with open("geo_new.csv", "a") as f:
    writer = csv.writer(f, delimiter=";")
    for value in a.values[1000:]:
        counter += 1
        print(counter)
        result = str(value[1])[14:]
        result = result.replace(" д.", "")
        prefix = ""
        for i, ch in enumerate(result):
            if ch.isdigit():
                j = i
                while j < len(result):
                    if result[j] in (" ", ",", "."):
                        break
                    prefix += result[j]
                    j += 1
            if ch == ",":
                break
        result = result.replace(prefix, "")
        if prefix:
            result = "Москва, " + prefix + " " + result
        result = "Москва, " + result
        result = result.replace(".", "")
        index = result.rfind(",")
        result = result[:index] + " " + result[index + 1 :]

        url = f"https://nominatim.openstreetmap.org/search.php?q={result}&polygon_geojson=1&accept-language=ru&countrycodes=ru&format=jsonv2"
        headers = {
            "content-type": "application/json; charset=UTF-8",
            "Host": "nominatim.openstreetmap.org",
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0",
        }

        response = requests.get(url=url, headers=headers)
        try:
            lon = response.json()[0]["lon"]
            lat = response.json()[0]["lat"]
            coords = response.json()[0]["geojson"]["coordinates"]
            writer.writerow([int(value[0]), lon, lat, coords])
        except Exception:
            pass
        time.sleep(0.1)
