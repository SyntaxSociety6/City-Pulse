import os
import random
import time
import requests
import sys

API_BASE = os.environ.get('API_BASE', 'http://localhost:4000')


def post_congestion():
    lat = 28.5 + random.random() * 0.3
    lng = 77.1 + random.random() * 0.3
    level = random.randint(1, 5)
    cause = random.choice(['Peak hour', 'Roadwork', 'Accident', 'Event'])
    r = requests.post(f'{API_BASE}/congestion', json={
        'location': {'lat': lat, 'lng': lng},
        'level': level,
        'causeHint': cause,
    })
    print('congestion', r.status_code)


def post_alert():
    lat = 28.5 + random.random() * 0.3
    lng = 77.1 + random.random() * 0.3
    msg = random.choice(['Road closed', 'Power outage', 'Sewage overflow'])
    type_ = random.choice(['closure', 'power', 'sewage'])
    severity = random.choice(['info', 'warning', 'critical'])
    r = requests.post(f'{API_BASE}/alerts', json={
        'type': type_,
        'severity': severity,
        'message': msg,
        'location': {'lat': lat, 'lng': lng},
        'source': 'system',
    })
    print('alert', r.status_code)


if __name__ == '__main__':
    try:
        while True:
            if random.random() < 0.6:
                post_congestion()
            else:
                post_alert()
            time.sleep(5)
    except KeyboardInterrupt:
        sys.exit(0)
